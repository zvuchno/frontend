import { OAuthConsentsPage } from "@/screens/auth";

export default async function OAuthConsents({
  searchParams
}: {
  searchParams: Promise<{ state: string }>
}) {
  const { state } = await searchParams;
  return (
    <OAuthConsentsPage state={state} />
  )
}