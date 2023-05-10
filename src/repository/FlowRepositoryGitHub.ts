import FlowRepository from "./FlowRepository.js";
import { FlowDescriptor}  from "../model/FlowDescriptor.js";
import {getFlowDescriptor, getFlowDescriptors} from "./GitHubQuery.js";

export default class FlowRepositoryGitHub implements FlowRepository{

    async getFlows(config:any): Promise<FlowDescriptor[]> {

        let repo = await getFlowDescriptors(config.connection, config.owner, config.repo, "HEAD:resources/architecture_flows/sequence/");
        let flows = await this.extractFlows(repo,config);

        return Promise.resolve(flows);

    }

    async extractFlows(repo: any, config: any) : Promise<FlowDescriptor[]>{

        let flows : FlowDescriptor[] = [];

        for (const entry of repo.repository.object.entries) {
            if (entry.type === 'blob') {
                let fd = entry.object.text;
                flows.push(new FlowDescriptor(fd));
            } else {
                if (entry.type === 'tree') {
                    let repo1 = await getFlowDescriptors(config.connection, config.owner, config.repo, "HEAD:"+entry.path);
                    flows = flows.concat(await this.extractFlows(repo1, config));
                }
            }
        }

        return Promise.resolve(flows);
    }


    getFlow(config: any): Promise<FlowDescriptor> {
        return getFlowDescriptor(config.connection, config.owner, config.repo, config.path).then(repo => {
            // @ts-ignore
            if (repo.repository.object!=null){
                // @ts-ignore
                return Promise.resolve(new FlowDescriptor(repo.repository.object.text));
            } else {
                return Promise.reject("Flow not found")
            }
        });
    }

}



