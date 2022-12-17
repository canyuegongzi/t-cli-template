import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'UserPassword',
  props: {
    size: {
      type: Number,
      default: 14,
    },
    color: {
      type: String,
      default: '#999',
    },
  },

  render() {
    return (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4354"
        width={this?.size}
        height={this?.size}
        fill={this?.color}
      >
        <path
          d="M780.8 354.58H665.6v-42.89c0-72.31-19.85-193.3-153.6-193.3-138.87 0-153.6 135.05-153.6 193.3v42.89H243.2v-42.89C243.2 122.25 348.79 0 512 0s268.8 122.25 268.8 311.69v42.89z m-192 314.84c0-43.52-34.58-78.65-76.8-78.65s-76.8 35.13-76.8 78.65c0 29.46 15.4 54.47 38.44 67.82v89.64c0 21.74 17.25 39.7 38.4 39.7s38.4-17.96 38.4-39.7v-89.64c23-13.35 38.36-38.36 38.36-67.82zM896 512v393.61c0 65.26-51.87 118.39-115.2 118.39H243.2c-63.291 0-115.2-53.13-115.2-118.39V512c0-65.22 51.87-118.39 115.2-118.39h537.6c63.33 0 115.2 53.17 115.2 118.39z"
          p-id="4355"
        ></path>
      </svg>
    );
  },
});
