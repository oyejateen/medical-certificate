[33mcommit 7a8e1167e37ff91f3751f73de3b6aa774b9a750d[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmaster[m[33m)[m
Merge: e4b5370 caa42ae
Author: oyejateen <jatinshrimali24@gmail.com>
Date:   Wed Mar 26 01:22:54 2025 +0530

    Merge remote changes and fix merge conflicts

[33mcommit e4b5370a5c7891e1a0b704d9496b815edab2c10e[m
Author: oyejateen <jatinshrimali24@gmail.com>
Date:   Wed Mar 26 01:19:08 2025 +0530

    Fix: TypeScript build errors and add Netlify configuration

[1mdiff --git a/netlify.toml b/netlify.toml[m
[1mnew file mode 100644[m
[1mindex 0000000..b9ef539[m
[1m--- /dev/null[m
[1m+++ b/netlify.toml[m
[36m@@ -0,0 +1,14 @@[m
[32m+[m[32m# Netlify configuration file[m[41m[m
[32m+[m[41m[m
[32m+[m[32m[build][m[41m[m
[32m+[m[32m  # Directory to publish (relative to root of the repository)[m[41m[m
[32m+[m[32m  publish = "dist"[m[41m[m
[32m+[m[41m  [m
[32m+[m[32m  # Build command[m[41m[m
[32m+[m[32m  command = "npm run build"[m[41m[m
[32m+[m[41m[m
[32m+[m[32m# Handle SPA routing for React Router[m[41m[m
[32m+[m[32m[[redirects]][m[41m[m
[32m+[m[32m  from = "/*"[m[41m[m
[32m+[m[32m  to = "/index.html"[m[41m[m
[32m+[m[32m  status = 200[m[41m [m
\ No newline at end of file[m
[1mdiff --git a/src/pages/Certificate.tsx b/src/pages/Certificate.tsx[m
[1mindex 7ef7150..1b9baa0 100644[m
[1m--- a/src/pages/Certificate.tsx[m
[1m+++ b/src/pages/Certificate.tsx[m
[36m@@ -182,13 +182,6 @@[m [mconst Certificate = () => {[m
   [m
   if (!certificateData) return null;[m
   [m
[31m-  // Calculate duration in words[m
[31m-  const startDateObj = new Date(certificateData.startDate);[m
[31m-  const endDateObj = new Date(certificateData.endDate);[m
[31m-  const durationInDays = Math.ceil([m
[31m-    (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)[m
[31m-  );[m
[31m-  [m
   const genderPronoun = [m
     certificateData.patientGender === 'male' ? 'his' : [m
     certificateData.patientGender === 'female' ? 'her' : [m
