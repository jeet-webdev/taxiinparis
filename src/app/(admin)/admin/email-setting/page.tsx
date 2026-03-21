import React from "react";
import { getEmailSetting } from "@/src/actions/emailSettingAction";
import EmailSettingForm from "@/src/feature/EmailSetting/components/EmailSettingForm";

export const metadata = { title: "Email Setting" };
export const dynamic = "force-dynamic";

export default async function EmailSettingPage() {
  const current = await getEmailSetting();

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Email Setting</h1>
        <p className="text-gray-500 text-sm mt-1">
          Configure your SMTP server and contact destination email.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <EmailSettingForm current={current} />
      </div>

      {/* <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700">
          <strong>Note:</strong> If no settings are saved here, the system falls
          back to your <code>.env.local</code> values automatically.
        </p>
      </div> */}
    </div>
  );
}
