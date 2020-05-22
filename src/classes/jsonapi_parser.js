import Vue from 'vue';

class Parser {


    parseRelationships(resource, model, included) {

        if(!resource.relationships) {
            return;
        }

        for(var relKey in resource.relationships) {

            if(!resource.relationships.hasOwnProperty(relKey)) {
                continue;
            }

            var relationshipSet = [];


            if(Array.isArray(resource.relationships[relKey].data)) {

                resource.relationships[relKey].data.forEach(relRecord => {

                    var relatedRecord;
                    if(!included) {
                        relationshipSet.push(relRecord);
                        return;
                    }

                    relatedRecord = included.find(include => {
                        return include.type === relRecord.type && include.id === relRecord.id;
                    });

                    if(relatedRecord) {
                        relationshipSet.push(this.parseSingleResource(relatedRecord));
                        return;
                    }

                    relationshipSet.push(relRecord);
                })

            } else {
                // if the relationship is a single object, then it's a one to one relationship, and the data object is the relationship record

                let relRecord = resource.relationships[relKey].data;
                relationshipSet = relRecord;
                if(included) {
                    let relatedRecord = included.find(include => {
                        return include.type === relRecord.type && include.id === relRecord.id;
                    });

                    if (relatedRecord) {
                        relationshipSet = this.parseSingleResource(relatedRecord);
                    }
                }
            }

            Vue.set(model, relKey, relationshipSet)
        }
    }

    parseSingleResource(resource, included) {

        var model = resource.attributes;
        this.parseRelationships(resource, model, included)
        return model;
    }

    parseMultipleResources(resources, included)  {

        var models = [];
        resources.forEach(resource => {
            models.push(this.parseSingleResource(resource, included));
        })

        return models;
    }


    parseJSONAPIResponse(response) {

        if(!response.data && response.meta && response.errors) {
            console.error('Invalid JSON:API response.  Unable to parse response', response);
            return;
        }

        var resources = [];
        if(Array.isArray(response.data)) {
            resources = this.parseMultipleResources(response.data, response.included, response.meta);
        } else {
            resources.push( this.parseSingleResource(response.data, response.included, response.meta));
        }

        if(response.meta.current_page) { // meta has laravel like pagination information
            resources = {
                current_page: response.meta.current_page,
                data: resources,
                from: response.meta.from,
                to: response.meta.to,
                per_page: response.meta.per_page,
                last_page: response.meta.last_page,
                total: response.meta.total
            }
        }

        return resources;
    }


}


export default new Parser;
