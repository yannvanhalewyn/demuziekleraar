import React from "react";
import ReactMarkdown from "react-markdown";

const LessonPreview = (lesson, { i }) => {
  const flip = i % 2 !== 0;

  return (
    <div
      key={i}
      className={`lg:flex lg:justify-between ${
        flip ? "lg:flex-row-reverse" : ""
      } lg:items-stretch py-10 lg:py-16`}
    >
      <div className="relative flex-1 lg:max-w-md">
        <div className="absolute bg-polka-dots bg-polka-dots--title mt-4 bg-repeat"></div>

        <div className="relative lg:flex lg:flex-col lg:justify-between lg:h-full">
          <h2 className="heading-2 font-extrabold text-gray-700 pl-4 border-l-8 border-orange-500">
            {lesson.name}
          </h2>

          <ReactMarkdown
            className="py-8 text-gray-800 leading-relaxed tracking-wider"
            children={lesson.description}
          />

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
          style={{ backgroundImage: `url('${lesson.image}')` }}
        ></div>
      </div>
    </div>
  );
};

const Teacher = ({ teacher, i }) => {
  const flip = i % 2 !== 0;

  return (
    <div
      className={`lg:flex lg:justify-between lg:items-stretch ${
        flip ? "lg:flex-row-reverse" : ""
      } mt-4 lg:mt-8 rounded-xl overflow-hidden shadow-xl bg-gray-100`}
    >
      <div className="lg:flex-grow lg:w-40 py-8 px-4 xs:px-8 lg:p-12">
        <h2 className="heading-3 font-black text-gray-800">ONTMOET JE DOCENT</h2>
        <h3 className="text-gray-600 tracking-wider">{teacher.name}</h3>

        <hr className="my-8 lg:my-12 border-t-2" />

        <div className="">
          {teacher.achievements.map((achievement) => {
            return (
              <div key={achievement.description} className="flex items-center py-2">
                <div className="inline-block p-2 rounded-full bg-blue-500">
                  <div
                    className="w-4 h-4 bg-contain bg-center"
                    style={{
                      backgroundImage: `url('${achievement.icon}')`,
                    }}
                  ></div>
                </div>

                <ReactMarkdown
                  className="ml-4 text-sm md:text-base text-gray-800"
                  children={achievement.description}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="lg:flex-1">
        <div
          className="bg-center bg-cover h-96 xs:h-112 lg:h-full"
          style={{
            backgroundImage: `url('${teacher.image}')`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default function LessonsPreview({ lessonGroups }) {
  return (
    <div>
      {lessonGroups.map((lessonGroup, i) => {
        return (
          <div key={i} className="m-container py-12 mb-12">
            {lessonGroup.lessons.map((lesson, i) =>
              LessonPreview(lesson, { i })
            )}
            <Teacher i={i} teacher={lessonGroup.teacher} />
          </div>
        );
      })}
    </div>
  );
}
