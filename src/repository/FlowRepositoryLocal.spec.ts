import 'mocha';
import {assert, expect} from "chai";
import FlowRepositoryLocal from "./FlowRepositoryLocal.js";

describe('The Local Flow Repository', function () {
    it('returns flows', function () {
        this.timeout(10000);
        let repo = new FlowRepositoryLocal();
        repo.getFlows({
            path: '/Users/e5591703/Projects/electronic-architect/resources/architecture_flows/sequence'
        }).then(flows => {
            expect(flows).to.have.length.above(0);
        })
    })
    it('returns a specific flow', function () {
        this.timeout(10000);
        let repo = new FlowRepositoryLocal();
        repo.getFlow({
            path: '/Users/e5591703/Projects/electronic-architect/resources/architecture_flows/sequence/',
            file: '/ia_proxy.yml'
        }).then(flow => {
            expect(flow).to.exist;
        }).catch(assert.fail("No flow was returned"))
    })
})
