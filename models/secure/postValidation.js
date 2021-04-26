const Yup = require('yup');

exports.schema = Yup.object().shape({
    title: Yup.string()
        .required("عنوان الزامی است")
        .min(5, "عنوان نباید کم تر از 5 کاراکتر باشد")
        .max(100, "عنوان نباید بیشتر از 100 کاراکتر باشد"),
    body: Yup.string()
        .required("پست جدید نباید خالی باشد"),
    status: Yup.mixed().oneOf(["عمومی", "خصوصی"], "وضعیت غیر مجاز میباشد.")

})