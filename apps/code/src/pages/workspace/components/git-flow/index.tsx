import { Gitgraph } from "@gitgraph/react";

export default function GitFlow() {
    return (
        <div className="h-full w-full">
            <Gitgraph>
                {(gitgraph) => {
                    // Simulate git commands with Gitgraph API.
                    const master = gitgraph.branch("master");
                    master.commit("Initial commit");

                    const develop = master.branch("develop");
                    develop.commit("Add TypeScript");

                    const aFeature = develop.branch("a-feature");
                    aFeature
                        .commit("Make it work")
                        .commit("Make it right")
                        .commit("Make it fast");

                    develop.merge(aFeature);
                    develop.commit("Prepare v1");

                    master.merge(develop).tag("v1.0.0");
                }}
            </Gitgraph>
        </div>
    );
}