import { Typography } from "~/components/typography";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 items-start p-20">
      <Typography.H1>H1 Heading</Typography.H1>
      <Typography.H2>H2 Heading</Typography.H2>
      <Typography.H3>H3 Heading</Typography.H3>
      <Typography.H4>H4 Heading</Typography.H4>
      <Typography.P>P Paragraph</Typography.P>
    </div>
  );
}
