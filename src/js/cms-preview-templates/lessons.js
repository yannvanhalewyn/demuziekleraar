import React from "react";
import { markdownToHtml } from "../markdown";

const LessonPreview = (lesson, props) => {
  const {i, getAsset } = props;
  const flip = i % 2 !== 0;

  return (
    <div
      key={i}
      className="lg:flex lg:justify-between lg:items-stretch py-10 lg:py-16"
    >
      <div className="relative flex-1 lg:max-w-md">
        <div className="absolute bg-polka-dots bg-polka-dots--title mt-4 bg-repeat"></div>

        <div className="relative lg:flex lg:flex-col lg:justify-between lg:h-full">
          <h2 className="heading-2 font-extrabold text-gray-700 pl-4 border-l-8 border-orange-500">
            {lesson.get("name")}
          </h2>

          <p className="py-8 text-gray-800 leading-relaxed tracking-wider"
             dangerouslySetInnerHTML={{__html: markdownToHtml(lesson.get("description"))}}>
          </p>

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
          style={{ backgroundImage: `url('${getAsset(lesson.get("image"))}')` }}
        ></div>
      </div>
    </div>
  );
};

export default class LessonsPreview extends React.Component {
  render() {
    const {entry, getAsset, widgetsFor} = this.props;

    return (
      <div>
        {entry.getIn(["data", "lessonGroups"]).map((lessonGroup, i) => {
          return (
            <div key={i} className="m-container py-12 mb-12">
              {lessonGroup
                .get("lessons")
                .map((lesson, i) => LessonPreview(lesson, {i, getAsset}))}
            </div>
          );
        })}
      </div>
    );
  }
}
