import sonarqubeScannerPkg from "sonarqube-scanner";
const sonarqubeScanner = sonarqubeScannerPkg.default || sonarqubeScannerPkg;

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.projectKey": "AiVisor",
      "sonar.projectName": "AiVisor",
      "sonar.projectVersion": "1.0.0",
      // "sonar.log.level": "DEBUG",
      "sonar.sources": "src",
      "sonar.tests": "src",
      "sonar.test.inclusions":
        "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx",
      "sonar.exclusions":
        "**/node_modules/**,**/dist/**,**/coverage/**,**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx",
      "sonar.typescript.file.suffixes": ".ts,.tsx",
      "sonar.javascript.file.suffixes": ".js,.jsx",
      "sonar.typescript.tsconfigPath": "tsconfig.json",
      "sonar.login": "sqa_b6be9359136a9733f443cc8928892e9447fd10c2",
    },
  },
  () => {
    console.log("SonarQube analysis completed");
  }
);
