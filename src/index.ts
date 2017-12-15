

export class DemoApp {
    /**
    * @param name Demo Name
    */
    constructor(public name: string) {}
    /**
    * @returns First test
    */
    public dummyMethod(): string {
         return 'First Test';
    }
    /**
    * @returns Second Test
    */
    public dummyMethod2(): string {
        return 'Second Test';
    }
}

