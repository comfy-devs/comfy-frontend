export default function (config, env, helpers) {
    config.target = "web";
    config.node = { fs: "empty" }
}