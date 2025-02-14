export namespace main {
	
	export class Tasks {
	    task: string;
	    status: string;
	    date: string;
	
	    static createFrom(source: any = {}) {
	        return new Tasks(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.task = source["task"];
	        this.status = source["status"];
	        this.date = source["date"];
	    }
	}

}

