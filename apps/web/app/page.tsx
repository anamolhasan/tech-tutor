import { redirect } from "next/navigation";

import { BASE_URL } from "@tech-tutor/config";

const HomePage = () => {
  redirect(BASE_URL);
};

export default HomePage;