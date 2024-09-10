import vertWGSL from "./vert.wgsl?raw";
import fragWGSL from "./frag.wgsl?raw";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const adapter = await navigator.gpu?.requestAdapter();
const device = await (async () => {
	const device = await adapter?.requestDevice();
	if (!device) {
		throw new Error("This browser does not support WebGPU");
	}
	return device;
})();

const context = canvas.getContext("webgpu") as GPUCanvasContext;

const devicePixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * devicePixelRatio;
canvas.height = canvas.clientHeight * devicePixelRatio;
const presentationFormat = navigator.gpu.getPreferredCanvasFormat();

context.configure({
	device,
	format: presentationFormat,
	alphaMode: "premultiplied",
});

const pipeline = device.createRenderPipeline({
	layout: "auto",
	vertex: {
		module: device.createShaderModule({
			code: vertWGSL,
		}),
	},
	fragment: {
		module: device.createShaderModule({
			code: fragWGSL,
		}),
		targets: [
			{
				format: presentationFormat,
			},
		],
	},
	primitive: {
		topology: "triangle-strip",
	},
});

function frame() {
	const commandEncoder = device.createCommandEncoder();
	const textureView = context.getCurrentTexture().createView();

	const renderPassDescriptor: GPURenderPassDescriptor = {
		colorAttachments: [
			{
				view: textureView,
				clearValue: [0, 0, 0, 0],
				loadOp: "clear",
				storeOp: "store",
			},
		],
	};

	const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
	passEncoder.setPipeline(pipeline);
	passEncoder.draw(4);
	passEncoder.end();

	device.queue.submit([commandEncoder.finish()]);
	requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
