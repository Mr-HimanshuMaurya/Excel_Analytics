import React from "react";

const TestimonialCard = ({ rating, content, author, role, avatar }) => {
  return (
    <article className="flex relative flex-col grow justify-center p-0.5 mt-1.5 w-full bg-black bg-opacity-0 max-md:mt-6">
      <div className="flex flex-col px-5 py-6 w-full bg-gray-900 rounded-lg border-2 border-gray-900 border-solid">
        <div className="flex gap-5 justify-between w-full">
          <div className="flex gap-1 my-auto">
            {rating.map((star, index) => (
              <img
                key={index}
                src={star}
                alt="Rating star"
                className="object-contain shrink-0 w-3.5 aspect-[1.08]"
              />
            ))}
          </div>
          <img
            src={avatar}
            alt={author}
            className="object-contain shrink-0 aspect-square w-[34px] rounded-full"
          />
        </div>
        <blockquote className="mt-10 text-xs leading-5 text-neutral-400">
          {content}
        </blockquote>
        <cite className="self-start mt-8 text-sm text-neutral-950 not-italic">
          {author}
        </cite>
        <p className="self-start mt-2.5 text-xs font-light text-gray-500">
          {role}
        </p>
      </div>
    </article>
  );
};

export default TestimonialCard;
