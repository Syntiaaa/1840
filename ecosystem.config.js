
const Sunucu_1 = "Incident";
module.exports = {
    apps: [
        {
            name: `${Sunucu_1}-EXECUTIVE`,
            script: "./Executive/main.js",
            watch: false
        },
        {
            name: `${Sunucu_1}-MOD`,
            script: "./Moderasyon/main.js",
            watch: false
        },
        {
            name: `${Sunucu_1}-GUARD`,
            script: "./Guard/index.js",
            watch: false
        }
    ]
};
