A minimal project to exercise a build issue between `pnpm` and `bazel`. The following commands will attempt to build a small Angular project, but the last command fails:

```shell
git clone https://github.com/spacetimejason/ng-application-builder && \
cd ng-application-builder && \
pnpm install && \
pnpm build && \
bazel build myapp
```
