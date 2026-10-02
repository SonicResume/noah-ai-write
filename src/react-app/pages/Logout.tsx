
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {

    const run = async () => {
      window.location.href = "/login";
    };

    run();
  }, []);

  return <div className="p-6">Logging out...</div>;
}