import { Content, Heading, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

const pageTitle = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  maxWidth: 640,
});

const breadcrumbText = style({
  font: "detail-sm",
  color: "neutral-subdued",
});

const leadParagraph = style({
  font: "body-lg",
  color: "neutral-subdued",
  lineHeight: "body",
});

export function AppMainHeader({
  sectionLabel,
  leadText,
}: {
  sectionLabel: string;
  leadText: string;
}) {
  return (
    <Content styles={pageTitle}>
      <Text styles={breadcrumbText}>ホーム / {sectionLabel}</Text>
      <Heading level={1}>{sectionLabel}</Heading>
      <Text styles={leadParagraph}>{leadText}</Text>
    </Content>
  );
}
