import React from "react";
import {markdownToHtml} from "../markdown";

const LessonPreview = (lesson, props) => {
  const {i, getAsset} = props;
  const flip = i % 2 !== 0;

  return (
    <div
      key={i}
      className={`lg:flex lg:justify-between ${ flip ? "lg:flex-row-reverse" : "" } lg:items-stretch py-10 lg:py-16`}
    >
      <div className="relative flex-1 lg:max-w-md">
        <div className="absolute bg-polka-dots bg-polka-dots--title mt-4 bg-repeat"></div>

        <div className="relative lg:flex lg:flex-col lg:justify-between lg:h-full">
          <h2 className="heading-2 font-extrabold text-gray-700 pl-4 border-l-8 border-orange-500">
            {lesson.get("name")}
          </h2>

          <p
            className="py-8 text-gray-800 leading-relaxed tracking-wider"
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(lesson.get("description")),
            }}
          ></p>

          <div className="text-center">
            <button className="btn btn--s border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">
              Lees meer
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 lg:max-w-md mt-10 lg:mt-0">
        <div
          className="h-64 sm:h-96 md:h-112 lg:h-full img-frame border-blue-500"
          style={{backgroundImage: `url('${getAsset(lesson.get("image"))}')`}}
        ></div>
      </div>
    </div>
  );
};

const Teacher = ({teacher, i, getAsset}) => {
  const flip = i % 2 !== 0;

  return (
    <div class={`lg:flex lg:justify-between lg:flex-row-reverse lg:items-stretch ${flip ? "lg:flex-row-reverse" : ""} mt-4 lg:mt-8 rounded-xl overflow-hidden shadow-xl bg-gray-100`}>
      <div class="lg:flex-grow lg:w-40 py-8 px-4 xs:px-8 lg:p-12">
        <h2 class="heading-3 font-black text-gray-800">ONTMOET JE DOCENT</h2>
        <h3 class="text-gray-600 tracking-wider">{teacher.get("name")}</h3>

        <hr class="my-8 lg:my-12 border-t-2" />

        <div class="">
          {teacher.get("achievements").map((achievement) => {
            return (
              <div class="flex items-center py-2">
                <div class="inline-block p-2 rounded-full bg-blue-500">
                  <div
                    class="w-4 h-4 bg-contain bg-center"
                    style={{
                      backgroundImage: `url('${getAsset(
                        achievement.get("icon")
                      )}')`,
                    }}
                  ></div>
                </div>

                <span class="ml-4 text-sm md:text-base text-gray-800"
                      dangerouslySetInnerHTML={{__html: markdownToHtml(achievement.get("description"))}}>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div class="lg:flex-1">
        <div
          class="bg-center bg-cover h-96 xs:h-112 lg:h-full"
          style={{
            backgroundImage: `url('${getAsset(teacher.get("image"))}')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default class LessonsPreview extends React.Component {
  render() {
    const {entry, getAsset} = this.props;

    return (
      <div>
        {entry.getIn(["data", "lessonGroups"]).map((lessonGroup, i) => {
          return (
            <div key={i} className="m-container py-12 mb-12">
              {lessonGroup
                .get("lessons")
                .map((lesson, i) => LessonPreview(lesson, {i, getAsset}))}
              <Teacher i={i} teacher={lessonGroup.get("teacher")} getAsset={getAsset}/>
            </div>
          );
        })}
      </div>
    );
  }
}
