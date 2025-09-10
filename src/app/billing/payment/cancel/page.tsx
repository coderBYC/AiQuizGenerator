import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const page = () => {
  return (
    <Alert variant="default">
      <AlertTitle className="mb-3 text-3xl text-red-400">Payment Failed</AlertTitle>
      <AlertDescription>
        Your payment has been cancelled.
        <br />
        <Link href="/dashboard" className="underline">Go to the dashboard</Link> to generate more quizzes.
      </AlertDescription>
    </Alert>
  )
};

export default page;