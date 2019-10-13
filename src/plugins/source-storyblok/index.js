const StoryblokClient = require('storyblok-js-client');

class StoryblokSource {
    static defaultOptions() {
        return {
            typeName: 'StoryblokSource',
            accessToken: undefined,
            contentTypes: []
        };
    }

    constructor(api, options) {
        this.options = options;
        api.loadSource(args => this.fetchContent(args));
    }

    async getStories() {
        const { accessToken, contentTypes } = this.options;
        const client = new StoryblokClient({ accessToken });
        const stories = [];

        for (let index = 0; index < contentTypes.length; index++) {
            const type = contentTypes[index];
            const response = await client.get('cdn/stories', {
                version: 'draft',
                sort_by: 'position:desc',
                filter_query: {
                    component: {
                        in: type
                    }
                }
            });

            console.log(`Adding ${type}`)

            stories.push({
                type,
                items: response.data.stories
            })
        }

        return stories
    }

    async fetchContent(store) {
        const { addCollection } = store;
        const stories = await this.getStories()

        for (const story of stories) {
            const contentType = addCollection({
                typeName: story.type
            })

            story.items.forEach((item) => {
                contentType.addNode(item)
            })
        }
    }
}

module.exports = StoryblokSource;