import 'mocha';
import FlowRepositoryGitHub from "./FlowRepositoryGitHub.js";
import {assert, expect} from "chai";
import {getGitHubGraphQLConn} from "@electronic-architect/ea-content";

import * as dotenv from 'dotenv';
dotenv.config()

describe('The Github Flow Repository', function () {
    it('returns flows', function () {
        let conn = getGitHubGraphQLConn(process.env.HOST || 'https://api.github.com' ,`Bearer ${process.env.TOKEN}`);
        const config = {
            connection: conn,
            owner: 'simonwfarrow',
            repo: 'ea-resources'
        };
        const repo = new FlowRepositoryGitHub()
        repo.getFlows(config).then(flows => {
            expect(flows).to.have.length.above(0);
        })
    })
    it('returns a specific flow', function () {
        let conn = getGitHubGraphQLConn(process.env.HOST || 'https://api.github.com' ,`Bearer ${process.env.TOKEN}`);
        const config = {
            connection: conn,
            owner: 'simonwfarrow',
            repo: 'ea-resources',
            path: 'resources/architecture_flows/sequence/example_flow2.yml'
        };
        const repo = new FlowRepositoryGitHub()
        repo.getFlow(config).then(flow => {expect(flow).to.have.property("name")})
            .catch(error => assert.fail("Flow not found"));
    })
    it('flow not found', function () {
        let conn = getGitHubGraphQLConn(process.env.HOST || 'https://api.github.com' ,`Bearer ${process.env.TOKEN}`);
        const config = {
            connection: conn,
            owner: 'simonwfarrow',
            repo: 'ea-resources',
            path: 'doesnt_exits'
        };
        const repo = new FlowRepositoryGitHub()
        repo.getFlow(config).catch(error => expect(error).to.eq("Flow not found"));
    })
})
