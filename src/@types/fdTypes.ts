
export type FlowDescriptor =  {
    id:             string;
    version:        number;
    name:           string;
    description:    string;
    tags?:          string[];
    links?:         Link[];
    review?:        Review[];
    steps:          Step[];
}

export type Link = {
    name:           string;
    url:            string;
    description:    string;
}

export type Review = {
    name:           string;
    date:           string;
}

export type Step = {
    sequence:           number;
    description:        string;
    producer:           Actor;
    consumer:           Actor;
    interaction?:       Interaction;
    return?:            Return;
    note?:              string;
    steps?:             Step[];
    overrides?:         Override[];
    condition?:         Condition;
}

export type Actor = {
    name:           string;
    $ref?:          string;
}

export type Interaction = {
    $ref:           string
    endpoint:       string;
}

export type Return = {
    value:          string;
    interaction?:   Interaction;
}

export type Condition = {
    name:           string;
    steps?:         Step[];
    else?:          Else;
}

export type Else = {
    name:           string;
    steps:          Step[];
}

export type Override = {
    regex:          string;
    value:          string;
}
