import GamingPage from "@/components/GamingPage";

/* Serve the page directly (no redirect) so link previews (WhatsApp, LinkedIn, Slack)
   read the Open Graph tags on the bare domain too. */
export default function Home() {
    return <GamingPage />;
}
