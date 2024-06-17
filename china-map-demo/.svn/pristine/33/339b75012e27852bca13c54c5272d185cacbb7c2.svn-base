export default function (stage) {
    const statusGreen = "51,204,153";
    const statusRed = "255,51,85";

    const scene = stage.childs[0];
    const allNodes = scene.getDisplayedNodes();
    allNodes.forEach((node) => {
        // console.log(node);
        const statusIcon = new JTopo.Node();
        statusIcon.setSize(20, 20);
        statusIcon.x = node.x - 20;
        statusIcon.y = node.y;
        statusIcon.borderRadius = 10;

        if (node.eleData?.assetIP) {
            const status = ip_list?.find((e) => `${e.ip},` == node.eleData.assetIP);
            // console.log(node.eleData.assetIP);
            if (!!status?.is_online) {
                statusIcon.fillColor = statusGreen;
            } else {
                statusIcon.fillColor = statusRed;
            }
        } else {
            statusIcon.fillColor = statusGreen;
        }

        scene.add(statusIcon);
    });
}