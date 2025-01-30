import Image from "next/image";
import Link from "next/link";
import { Page } from "~/components/page";
import { Typography } from "~/components/typography";
import { PROJECT_QUERY } from "~/lib/queries";
import { sanityFetch } from "~/sanity/lib/live";

interface Props {
  params: Promise<{ project: string }>;
}

export default async function ProjectDetail({ params }: Props) {
  const slug = (await params).project;

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug },
  });

  if (!project) {
    return null;
  }

  return (
    <Page className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-6 lg:gap-x-8 pb-[120px]">
      {/* Header */}
      <div className="col-span-full flex flex-col mt-10 md:mt-18 lg:translate-y-6 lg:mt-28">
        <Typography.P className="text-secondary uppercase">/ WORK</Typography.P>
        <div className="relative inline-block w-fit">
          <Typography.H1 className="leading-none w-fit mt-1 mb-8">{project.name}</Typography.H1>
          <Typography.P className="absolute top-0 -right-2 translate-x-full text-primary">
            [{project.year}]
          </Typography.P>
        </div>
        <Typography.P className="text-secondary uppercase">{project.subtitle}</Typography.P>
      </div>

      <div className="h-16 md:h-24 lg:h-36 border-t border-tertiary col-span-full" />

      {/* Visit Button */}
      {project.url && (
        <div className="col-span-full flex justify-end">
          <Link href={project.url} target="_blank" rel="noopener noreferrer" className="group">
            <Typography.P className="text-primary uppercase">VISIT →</Typography.P>
          </Link>
        </div>
      )}

      {/* Project Image */}
      {project.mainImage && (
        <div className="col-span-full aspect-[16/9] relative">
          <Image
            src={project.mainImage as string}
            alt={project.name!}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Description */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        A /
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        DESCRIPTION
      </Typography.P>
      <Typography.H3 className="text-start col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        {project.description}
      </Typography.H3>

      <div className="h-px bg-tertiary col-span-full" />

      {/* Work */}
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
        B /
      </Typography.P>
      <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
        WORK
      </Typography.P>
      <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
        <Typography.P className="text-secondary uppercase">
          {project.skills?.map((skill) => (
            <span key={skill._id}>
              {skill.name}
              <br />
            </span>
          ))}
        </Typography.P>
      </div>

      {/* Secondary Image */}
      {project.secondaryImage && (
        <div className="col-span-full aspect-video relative mt-16">
          <Image
            src={project.secondaryImage as string}
            alt={project.name!}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="h-px bg-tertiary col-span-full" />

      {/* Quote */}
      {project.quote?.text && project.quote.author && (
        <>
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-1">
            C /
          </Typography.P>
          <Typography.P className="text-secondary uppercase text-start col-span-1 md:col-start-2">
            QUOTE
          </Typography.P>
          <div className="col-span-4 md:col-start-4 md:col-span-5 lg:col-start-5 lg:col-span-6">
            <Typography.H3 className="text-start text-balance">
              &ldquo;{project.quote.text}&rdquo;
            </Typography.H3>
            <div className="flex items-center gap-2 mt-4">
              {project.quote.author.image && (
                <Image
                  src={project.quote.author.image as string}
                  alt={project.quote.author.name!}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <Typography.P className="text-secondary uppercase">
                {project.quote.author.name}, {project.quote.author.role}
              </Typography.P>
            </div>
          </div>
        </>
      )}

      {/* Additional Images */}
      {project.images && project.images.length > 0 && (
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-16">
          {project.images.map(
            (image, index) =>
              image && (
                <div key={index} className="aspect-video relative">
                  <Image
                    src={image as string}
                    alt={`${project.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )
          )}
        </div>
      )}
    </Page>
  );
}
