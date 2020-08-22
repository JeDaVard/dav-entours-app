export default {
    Query: {
        fields: {
            me: {
                merge(existing, incoming, { mergeObjects }) {
                    return mergeObjects(existing, incoming)
                }
            },
            search: {
                merge(ex= {}, inc) {
                    return inc
                }
            },
            recommended: {
                merge(ex= [], inc) {
                    return inc
                }
            },
            tour: {
                merge(ex= {}, inc, {mergeObjects}) {
                    return mergeObjects(ex, inc)
                },
            }
        }
    },
    Conversation: {
        fields: {
            start: {
                merge(existing, incoming) {
                    return {...existing, ...incoming}
                },
            }
        }
    },
    Tour: {
        fields: {
            startLocation: {
                merge(existing, incoming) {
                    return {...existing, ...incoming}
                },
            },
            reviews: {
                merge(existing= { data: [] }, incoming, { mergeObjects }) {
                    return {
                        ...incoming,
                        data: [
                            ...existing.data,
                            ...incoming.data
                        ]
                    }
                },
            },
            starts: {
                merge(ex= [], inc) {
                    return [...ex, ...inc]
                }
            }
        }
    }
}