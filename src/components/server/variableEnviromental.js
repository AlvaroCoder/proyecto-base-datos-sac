import { loadEnvConfig  } from "@next/env";
const projectDir = process.cwd()
loadEnvConfig(projectDir);

export default defineConfig({
    apiConnection : {
        baseUrl : process.env.BASE_URL
    }
})