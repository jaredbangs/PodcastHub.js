export class ChaiWrapper {

    private static assert: Chai.AssertStatic;
    
    private static initialized: boolean = false;

    public static async importAssert(): Promise<Chai.AssertStatic> {
    
        await ChaiWrapper.initialize();
        
        return ChaiWrapper.assert;
    }

    private static async initialize(): Promise<void> {

        if (!ChaiWrapper.initialized) {

            const chai = await import('chai');
            const chaiDT = await import('chai-datetime');
            chai.use(chaiDT.default);

            ChaiWrapper.assert = chai.assert;

            ChaiWrapper.initialized = true;
        }
    }
}