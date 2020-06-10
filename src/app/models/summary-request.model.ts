export class SummaryRequest {
    section_names: string[];
    sections: string[];

    constructor(sectionNames: string[], sections: string[]) {
        this.section_names = sectionNames;
        this.sections = sections;
    }
}