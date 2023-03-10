import FlowRepository from "./FlowRepository.js";
import * as fs from "fs";
import path from "path";
import { FlowDescriptor } from "../model/FlowDescriptor.js";

class FlowRepositoryLocal implements FlowRepository {

    getFlows(config: any): Promise<FlowDescriptor[]> {

        let flows: FlowDescriptor[] = [];
        fs.readdir(config.path, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            files.forEach(function (file) {

                file = path.resolve(config.path, file);

                fs.readFile(file, 'utf-8', (err,data) => {
                    if (err) {
                        console.error(err);
                    }
                    flows.push(new FlowDescriptor(data));
                });



            });

        });
        return Promise.resolve(flows);
    }

    getFlow(config:any): Promise<FlowDescriptor> {

        // @ts-ignore
        let flow: FlowDescriptor = null;
        let file = path.resolve(config.path, config.file);

        let data = fs.readFileSync(file,'utf-8')
        flow = new FlowDescriptor(data);

        if (flow!=null){
            return Promise.reject('flow null')
        } else {
            return Promise.resolve(flow);
        }

    }
}

export default FlowRepositoryLocal
