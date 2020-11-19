import React from "react";
import CMS from "netlify-cms-app";

// Import main site styles as a string to inject into the CMS preview pane
import styles from "!to-string-loader!css-loader!postcss-loader!sass-loader!../css/main.css";
import BannerPreview from "./cms-preview-templates/banner";
import LessonsPreview from "./cms-preview-templates/lessons";
import PricingPreview from "./cms-preview-templates/pricing";

CMS.registerPreviewStyle(styles, { raw: true });
CMS.registerPreviewTemplate("home", BannerPreview);
CMS.registerPreviewTemplate("lessons", LessonsPreview);
CMS.registerPreviewTemplate("pricing", PricingPreview);
CMS.init();
