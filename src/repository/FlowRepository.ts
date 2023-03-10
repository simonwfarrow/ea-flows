import { FlowDescriptor } from "../model/FlowDescriptor.js";

export default interface FlowRepository {
    getFlows(config: any): Promise<FlowDescriptor[]>
    getFlow(config: any): Promise<FlowDescriptor>
}
