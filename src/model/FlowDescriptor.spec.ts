import 'mocha';
import {expect} from "chai";
import { FlowDescriptor } from './FlowDescriptor.js';

const fdStr : string  = 'id: example_flow\n' +
    'version: 1.0\n' +
    'name: Example Flow\n' +
    'description: This is an example flow\n' +
    'tags:\n' +
    '  - tag1\n' +
    '  - tag2\n' +
    'links:\n' +
    '  - name: Link 1\n' +
    '    url: https://google.co.uk\n' +
    '    description: Link to google\n' +
    'review:\n' +
    '  - name: Me\n' +
    '    date: 06/10/22\n' +
    'steps:\n' +
    '  - sequence: 1\n' +
    '    description: First Step\n' +
    '    note: |\n' +
    '      Multiline note\n' +
    '      example\n' +
    '    producer:\n' +
    '      name: Actor1\n' +
    '    consumer:\n' +
    '      name: Actor2\n' +
    '      $ref: \'service_descriptors/actor2.yml\'\n' +
    '    return:\n' +
    '      value: some response\n' +
    '      interaction:\n' +
    '        $ref: \'service_descriptors/actor2.yml#/interactions/example_response\'\n' +
    '        endpoint: response_topic\n' +
    '    interaction:\n' +
    '      $ref: \'service_descriptors/actor2.yml#/interactions/example_request\'\n' +
    '      endpoint: create_topic\n' +
    '    steps:\n' +
    '      - sequence: 1\n' +
    '        condition:\n' +
    '          name: example condition\n' +
    '        description: Another request\n' +
    '        producer:\n' +
    '          name: Actor2\n' +
    '          $ref: \'service_descriptors/actor2.yml\'\n' +
    '        consumer:\n' +
    '          name: actor3\n';

describe('The FlowDescriptor class', function () {
    it('is constructed from yaml', function () {
        let result = new FlowDescriptor(fdStr);
        expect(result).to.have.property('name');
        expect(result).to.have.property('steps').to.have.length(1);
    })
    it('is constructed empty', function () {
        let result = new FlowDescriptor();
        expect(result).to.exist;
    })
})
