import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { HackerText } from "~/components/hacker-text";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";
import { PROJECTS_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

export default async function Work() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">
          <HackerText
            iterationsToAdvance={2}
            speed={50}
            startsComplete
            minRepeatTime={5000}
            maxRepeatTime={10000}
          >
            / WORK
          </HackerText>
        </Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">Projects</Typography.H1>
          <Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
            [{projects?.length}]
          </Typography.P>
        </div>
        <Typography.P className="text-secondary uppercase max-w-[250px]">
          <span className="text-primary">
            <HackerText
              iterationsToAdvance={2}
              speed={30}
              startsComplete
              minRepeatTime={5000}
              maxRepeatTime={10000}
            >
              SELECTED PROJECTS.
            </HackerText>
          </span>
            {" "}EXPLORE THE WORK WE DID WITH AMAZING CLIENTS.
        </Typography.P>
      </div>

      <div className="h-16 md:h-24 lg:h-36 border-t border-b border-tertiary col-span-full" />

      {/* Section number and label */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        <HackerText
          iterationsToAdvance={2}
          speed={30}
          startsComplete
          minRepeatTime={5000}
          maxRepeatTime={10000}
        >
          [ 01 ]
        </HackerText>
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        <HackerText
          iterationsToAdvance={2}
          speed={30}
          startsComplete
          minRepeatTime={5000}
          maxRepeatTime={10000}
        >
          PROJECTS
        </HackerText>
      </Typography.P>

      {/* Description */}
      <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        We build relationships that continue to deliver value long after a project ends. Below is a
        selection of projects from diverse industries, showcasing the unique partnerships and
        impactful results we&apos;ve created together.
      </Typography.H3>

      {/* Projects Grid */}
      <div className="col-span-4 md:col-span-8 lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-8">
        {projects?.map((project, index) => (
          <Link
            key={project._id}
            href={`/work/${project.slug}` as Route}
            className="group flex flex-col"
          >
            <div className="relative aspect-[384/202] bg-black overflow-hidden border border-tertiary">
              <Image
                src={project.thumbnail ?? ""}
                alt={project.name ?? ""}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Animated borders */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Top left corner */}
                <div className="absolute top-2 left-2 w-2 h-2">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                </div>
                {/* Top right corner */}
                <div className="absolute top-2 right-2 w-2 h-2">
                  <div className="absolute top-0 right-0 w-full h-[1px] bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <div className="absolute top-0 right-0 w-[1px] h-full bg-white origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                </div>
                {/* Bottom left corner */}
                <div className="absolute bottom-2 left-2 w-2 h-2">
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                </div>
                {/* Bottom right corner */}
                <div className="absolute bottom-2 right-2 w-2 h-2">
                  <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <Typography.P className="uppercase">{project.name}</Typography.P>
              <Typography.P>[{index + 1}]</Typography.P>
            </div>
          </Link>
        ))}
      </div>
    </Page>
  );
}
