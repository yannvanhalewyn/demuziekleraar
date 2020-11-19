import React from "react";
import CMS from "netlify-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.css";
import BannerPreview from "./cms-preview-templates/banner";
import ContactPreview from "./cms-preview-templates/contact";
import LessonsPreview from "./cms-preview-templates/lessons";

CMS.registerPreviewStyle(styles, { raw: true });
CMS.registerPreviewTemplate("home", BannerPreview);
CMS.registerPreviewTemplate("lessons", LessonsPreview);
CMS.registerPreviewTemplate("contact", ContactPreview);
CMS.init();
