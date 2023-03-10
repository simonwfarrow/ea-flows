// @ts-nocheck
import yaml from "js-yaml";

export const parseYaml = function (service: string) {
    return yaml.load(service);
}

export class FlowDescriptor {
    id:             string;
    version:        number;
    name:           string;
    description:    string;
    tags?:          string[];
    links?:         Link[];
    review?:        Review[];
    steps:          Step[];

    constructor(flow?: string) {

        if (flow!=null) {
            const ymlObj = parseYaml(flow);


            this.id = ymlObj.id;
            this.version = ymlObj.version;
            this.name = ymlObj.name;
            this.description = ymlObj.description;
            this.tags = [];
            if (ymlObj.tags != null) {
                ymlObj.tags?.forEach(tag => {
                    this.tags.push(tag)
                });
            }
            this.links = [];
            if (ymlObj.links != null) {
                ymlObj.links?.forEach(link => {
                    this.links.push(new Link(link))
                })
            }
            this.review = [];
            if (ymlObj.review != null) {
                ymlObj.review?.forEach(review => {
                    this.review.push(new Review(review))
                })
            }
            this.steps = [];
            if (ymlObj.steps != null) {
                ymlObj.steps.forEach(step => {
                    this.steps.push(new Step(step))
                })
            }
        }

    }
}

export class Link {
    name:           string;
    url:            string;
    description:    string;

    constructor(links: any) {
        this.name = links.name;
        this.url = links.url;
        this.description = links.description;
    }

}

export class Review {
    name:           string;
    date:           string;

    constructor(review: any) {
        this.name = review.name;
        this.date = review.date;
    }

}

export class Step {
    sequence:           number;
    $ref?:              string;
    description?:       string;
    producer?:          Actor;
    consumer?:          Actor;
    interaction?:       Interaction;
    return?:            Return;
    note?:              string;
    steps?:             Step[];
    overrides?:         Override[];
    condition?:         Condition;

    constructor(step?: any) {
        if (step!=null) {
            this.sequence = step.sequence;
            this.$ref = step.$ref;
            this.description = step.description;
            this.producer = new Actor(step.producer);
            this.consumer = new Actor(step.consumer);
            this.interaction = new Interaction(step.interaction);
            this.return = new Return(step.return);
            this.node = step.note;
            this.steps = [];
            if (step.steps != null) {
                step.steps.forEach(subStep => {
                    this.steps.push(new Step(subStep))
                });
            }
            this.overrides = [];
            if (step.overrides != null) {
                step.overrides.forEach(override => {
                    this.overrides.push(new Override(override))
                })
            }
            if (step.condition != null) {
                this.condition = new Condition(step.condition);
            }
        }
    }
}

export class Actor {
    name:           string;
    $ref?:          string;

    constructor(actor?: any) {
        this.name = actor?.name;
        this.$ref = actor?.$ref;
    }
}

export class Interaction {
    $ref:           string
    endpoint:       string;
    constructor(interaction?: any) {
        this.$ref = interaction?.$ref;
        this.endpoint = interaction?.endpoint;
    }
}

export class Return {
    value:          string;
    interaction?:   Interaction;

    constructor(returnObj: any) {
        this.value = returnObj?.value;
        this.interaction = new Interaction(returnObj?.interaction);
    }
}

export class Condition {
    name:           string;
    steps?:         Step[];
    else?:          Else;

    constructor(condition: any) {
        this.name = condition.name;
        this.steps = [];
        if (condition.steps != null) {
            condition.steps.forEach(step => {this.steps.push(new Step(step))})
        }
        if (condition.else != null){
            this.else = new Else(condition.else);
        }

    }
}

export class Else {
    name:           string;
    steps:          Step[];
}

export class Override {
    regex:          string;
    value:          string;

    constructor(override: any) {
        this.regex = override.regex;
        this.value = override.value;
    }
}
