/* eslint no-console:0 */
import present from 'present';

export default function logSlowReducers(reducers, thresholdInMs = 8) {
    if (!__DEV__) {
        return reducers;
    }

    Object.keys(reducers).forEach((name) => {
        const originalReducer = reducers[name];

        reducers[name] = (state, action) => {
            const start = present();
            const result = originalReducer(state, action);
            const diffInMs = present() - start;

            if (diffInMs >= thresholdInMs) {
                console.warn(`Reducer "${name}" took ${diffInMs}ms for ${action.type}`);
            }

            return result;
        };
    });

    return reducers;
}
