import { getServerSession } from "@/features/auth/auth-utils";
import React from "react";

const ProfilePage = async () => {
  const session = await getServerSession();
  return (
    <React.Fragment>
      <main>
        <pre>{session && JSON.stringify(session, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default ProfilePage;
