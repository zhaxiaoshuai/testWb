/**
 * Regex类，正则验证.
 * @constructor
 * @param {title} - 正则验证.
 * @param {author} - zhangling.
 * @param {time} - 2017-04-17 17:00.
 */

//是否是英文
export const isEnglish = (str) => {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

export const isLicensePlate = (str) => {
    const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
    return reg.test(str);
}

