import { LegalDocumentDetails } from "@/screens/legalDocument";

type LegalDocumentDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegalDocumentDetailsPage({ params }: LegalDocumentDetailsPageProps) {
  const { slug } = await params;
  return <LegalDocumentDetails slug={slug} />;
}
