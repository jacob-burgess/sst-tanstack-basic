import { Await, createFileRoute, defer } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Suspense } from "react";

const fetchData = createServerFn(
  "GET",
  async ({ delay }: { delay?: number }) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return {
      time: Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date()),
    };
  }
);

export const Route = createFileRoute("/stream")({
  loader: async () => {
    const slow = fetchData({ delay: 2000 });
    const slower = fetchData({ delay: 3000 });
    const slowest = fetchData({ delay: 4000 });

    const fast = await fetchData({ delay: 500 });

    return {
      slow: defer(slow),
      slower: defer(slower),
      slowest: defer(slowest),
      fast,
    };
  },
  component: () => <PageComponent />,
});

const PageComponent = () => {
  const { slow, slower, slowest, fast } = Route.useLoaderData();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        textAlign: "right",
      }}
    >
      <div>non-deferred: {fast.time}</div>
      <div>
        deffered (slow): <Suspend promise={slow} />
      </div>
      <div>
        deffered (slower): <Suspend promise={slower} />
      </div>
      <div>
        deffered (slowest): <Suspend promise={slowest} />
      </div>
    </div>
  );
};

const Suspend = ({ promise }: { promise: Promise<any> }) => {
  return (
    <Suspense fallback={"Loading..."}>
      <Await promise={promise}>
        {(data) => {
          return data.time;
        }}
      </Await>
    </Suspense>
  );
};
