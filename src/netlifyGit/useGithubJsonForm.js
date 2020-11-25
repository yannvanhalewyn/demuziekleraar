import { useState } from "react";
import { useCMS, useForm } from "tinacms";
import { useCurrentUser, accessToken, fullName } from "../components/netlifyIdentityProvider"
import Github from "./githubClient";

export const useGithubJsonForm = (formConfig) => {
  const cms = useCMS();
  const currentUser = useCurrentUser();
  const [githubFile, setGithubFile] = useState(null);

  const loadInitialValues = async () => {
    const file = await Github.fetchFile(formConfig.fileName, {
      accessToken: accessToken(currentUser),
    });
    setGithubFile(file);

    let values = file.content ? JSON.parse(file.content) : {};

    return values;
  };

  const onSubmit = async (values, form) => {
    try {
      cms.alerts.info("Opslaan... ");

      const res = await Github.commit(formConfig.fileName, {
        accessToken: accessToken(currentUser),
        fileContents: JSON.stringify(values, null, 2),
        encode: true,
        sha: githubFile.sha,
        message: `Update ${formConfig.fileName} by ${fullName(currentUser)}`,
      });

      // TODO better error handling, a 4xx response will just return the res.
      cms.alerts.success(
        "Opgeslagen! Het kan een paar minuten duren voordat " +
          "de aanpassingen te zien zijn."
      );

      setGithubFile({ ...githubFile, sha: res.content.sha });
    } catch (err) {
      cms.alerts.error(
        "Er ging iets mis, aanpassingen konden niet opgeslagen worden."
      );
      console.error("Failed to create commit", err);
      throw(err); // TinaCMS won't allow retries if nothing is thrown.
    }
  };

  formConfig.onSubmit = onSubmit;
  formConfig.loadInitialValues = loadInitialValues;

  const [banner, form] = useForm(formConfig);

  // Formconfig is not reloaded every cycle. This is an issue for the onSubmit
  // handler which depends on the githubFile state. When a new githubFile
  // comes in after load, the form will still use the old onSubmit, which
  // still uses the initial githubFile state.
  //
  // See initialLoad effect:
  // https://github.com/tinacms/tinacms/blob/master/packages/%40tinacms/react-core/src/use-form.ts#L71
  //
  // There seems to be no way of storing the new SHA without using some form of
  // mutable OO like TinaCMS's GithubFile class does (mutate this.sha after
  // fetchFile). So I'd rather hack the correct handler in this way and keep the
  // API functional reactive.
  form.onSubmit = onSubmit;
  return [banner, form];
};
