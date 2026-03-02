import {base64Decode} from "@/utils/base64Encode";
import {ElMessage} from "element-plus";

export function downExport(res) {
    const url = window.URL.createObjectURL(res.data)
    const filename = base64Decode(res.headers.filename) || Date.now() + '.xlsx';
    const link = document.createElement('a')

    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    // 现代浏览器推荐：先添加到body再触发
    document.body.appendChild(link);
    link.click();

    // 异步清理，避免影响下载
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);

    ElMessage.success('导出成功');
}
