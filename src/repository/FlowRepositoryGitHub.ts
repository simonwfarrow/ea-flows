import FlowRepository from "./FlowRepository.js";
import { FlowDescriptor}  from "../model/FlowDescriptor.js";
import {getFlowDescriptor, getFlowDescriptors} from "./GitHubQuery.js";

export default class FlowRepositoryGitHub implements FlowRepository{

    getFlows(config:any): Promise<FlowDescriptor[]> {
        return getFlowDescriptors(config.connection, config.owner, config.repo).then(repo => {

            let flows : FlowDescriptor[] = [];

            // @ts-ignore
            repo.repository.object.entries.forEach(entry => {
                if (entry.type === 'blob') {
                    let fd = entry.object.text;
                    flows.push(new FlowDescriptor(fd));
                }
            });
            return Promise.resolve(flows);
        });

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



