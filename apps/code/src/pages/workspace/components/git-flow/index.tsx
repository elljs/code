import { Gitgraph, templateExtend, TemplateName } from "@gitgraph/react";
import "./index.css";

const template = templateExtend(TemplateName.Metro, {
    commit: {
        color: 'red'
    },
    tag: {
        color: 'black',
        strokeColor: '#ce9b00',
        bgColor: '#ffce52',
        font: 'italic 12pt serif',
        borderRadius: 0,
        pointerWidth: 6,
    },
});

export default function GitFlow() {
    return (
        <div className="git-flow">
            <Gitgraph options={{
                template
            }}>
                {(gitgraph) => {
                    // Simulate git commands with Gitgraph API.
                    const master = gitgraph.branch("master");
                    master.commit("Initial commit");

                    const develop = master.branch("develop");
                    develop.commit("Add TypeScript");

                    const aFeature = develop.branch("a-feature");
                    aFeature
                        .commit('one')
                        .tag('v1')
                        .commit('two')
                        .tag('v2')
                        .tag('important')
                        .commit('three');

                    develop.merge(aFeature);
                    develop.commit("Prepare v1");

                    master.merge(develop).tag("v1.0.0");
                }}
            </Gitgraph>
        </div>
    );
}