import React from 'react';
import { ArrowLeft, Shield, Mail, MapPin, Globe, Eye, Lock, Users, FileText, Calendar, Database } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-3 hover:bg-purple-100 rounded-full transition-all duration-200 transform hover:scale-110 hover:shadow-lg"
          >
            <ArrowLeft size={24} className="text-purple-600" />
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-600">How we collect, use, and protect your information</p>
          </div>
        </div>

        {/* Effective Date */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Effective Date</h2>
          </div>
          <p className="text-gray-700 text-lg">September 23, 2025</p>
          <p className="text-gray-600 mt-2">
            Sponsorloop Proprietorship ("Sponsorloop," "we," "our," or "us") provides a platform for connecting brands and influencers and delivering insights based on social media and engagement data. This Privacy Policy describes how we collect, use, store, and protect your information.
          </p>
        </div>

        {/* Company Details */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">1. Company Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Company</p>
                  <p className="text-gray-600">Sponsorloop Proprietorship</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:saadabid643@gmail.com" className="text-purple-600 hover:underline">
                    saadabid643@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">
                    26-A, First Floor, First Lane, Johri Farm,<br />
                    Noor Nagar Extn., Jamia,<br />
                    New Delhi, Delhi, 110025
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Domain</p>
                  <a href="https://sponsorloop.in" className="text-purple-600 hover:underline">
                    https://sponsorloop.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scope of Policy */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">2. Scope of Policy</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">This Policy applies to:</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Visitors to https://sponsorloop.in</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Registered Sponsorloop users (brands & influencers)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">People interacting with Sponsorloop via Meta (Instagram Graph API / Facebook Graph API)</span>
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-800">
                <strong>Note:</strong> This does not cover third-party platforms you connect with (e.g., Instagram, Facebook, Stripe, Razorpay, Google Analytics). Those services have their own privacy policies.
              </p>
            </div>
          </div>
        </div>

        {/* Data We Collect */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Database className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">3. Data We Collect</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Examples</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Account Data</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Name, email, username/handle, password hash (if applicable)</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Provided by user</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Social Media Data (via Meta APIs)</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Instagram insights (reach, impressions, engagement), profile info, page metrics</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Through Meta APIs (with your permission)</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Usage Data</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">IP address, device type, browser, logs, cookies, timestamps</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Collected automatically</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Platform Data</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Influencer–brand interactions, campaign details, messages</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Generated on Sponsorloop</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Payment Metadata</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Plan type, billing details, transaction history</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Stripe / Razorpay</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why We Use Data */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">4. Why We Use Data</h2>
          </div>
          <div className="space-y-3">
            <p className="text-gray-700 mb-4">We use your information to:</p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Match brands with influencers based on profile and metrics</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Provide campaign insights and analytics</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Communicate with you (support, updates, notifications)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Maintain and improve our platform (debugging, performance monitoring)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <span className="text-gray-700">Comply with legal and regulatory obligations</span>
              </li>
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
              <p className="text-green-800 font-semibold">
                We do not sell or rent your personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Data Sharing & Sub-Processors */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">5. Data Sharing & Sub-Processors</h2>
          </div>
          <p className="text-gray-700 mb-4">We may share data with trusted service providers under strict agreements:</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Provider</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Purpose</th>
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Region</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Firebase</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Hosting, database, authentication</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Global</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Netlify</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Web hosting</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Global</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Stripe / Razorpay</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Payment processing</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Global</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Meta (Facebook/Instagram)</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Social media metrics</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Global</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-medium text-gray-900">Analytics Providers (if enabled)</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Usage tracking</td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700">Global</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">6. Data Retention</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Account Data</h3>
              <p className="text-gray-700 text-sm">While account is active + 30 days after deletion</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Social Media Metrics</h3>
              <p className="text-gray-700 text-sm">As long as connected account remains linked</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Records</h3>
              <p className="text-gray-700 text-sm">7 years (legal requirement)</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Logs</h3>
              <p className="text-gray-700 text-sm">12 months</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Backups</h3>
              <p className="text-gray-700 text-sm">30 days</p>
            </div>
          </div>
        </div>

        {/* User Rights */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">7. User Rights</h2>
          </div>
          <p className="text-gray-700 mb-4">You may request to:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Access your data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Correct inaccurate data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Delete your data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Export your data (portability)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Withdraw consent (where applicable)</span>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
            <p className="text-blue-800">
              Contact us at <a href="mailto:saadabid643@gmail.com" className="font-semibold underline">saadabid643@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Cookies & Tracking */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">8. Cookies & Tracking</h2>
          </div>
          <p className="text-gray-700 mb-4">We use cookies for:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">Essential session management</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">Preferences (UI settings)</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">Analytics (usage tracking, if enabled)</span>
            </li>
          </ul>
          <p className="text-gray-600">You can manage cookies via your browser settings.</p>
        </div>

        {/* Meta Compliance */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">9. Compliance with Meta Policies</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Sponsorloop's use of the Instagram Graph API / Facebook Graph API complies with Meta's Platform Terms:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span className="text-gray-700">We only request permissions needed for analytics and brand–influencer matching.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span className="text-gray-700">We do not use Meta data for surveillance, discrimination, or resale.</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Data is used strictly for features shown in Sponsorloop.</span>
            </li>
          </ul>
        </div>

        {/* Security */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">10. Security</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">TLS encryption in transit</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Encrypted storage of sensitive data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Access controls and monitoring</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Regular audits and security reviews</span>
            </div>
          </div>
        </div>

        {/* Children's Information */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">11. Children's Information</h2>
          </div>
          <p className="text-gray-700">
            Sponsorloop is not intended for children under 13. We do not knowingly collect their data.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">12. Changes to This Policy</h2>
          </div>
          <p className="text-gray-700 mb-4">If we update this Privacy Policy, we will:</p>
          <ul className="space-y-2">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Post it on <a href="https://sponsorloop.in/privacy" className="text-purple-600 hover:underline">https://sponsorloop.in/privacy</a></span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Update the "Effective Date"</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span className="text-gray-700">Provide notice for material changes</span>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-xl text-white p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">13. Contact Us</h2>
          </div>
          <p className="text-white/90 mb-6">
            For questions about this Privacy Policy or to exercise your data rights:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-white/80 mt-1" />
              <div>
                <p className="font-semibold text-white">Email</p>
                <a href="mailto:saadabid643@gmail.com" className="text-white/90 hover:text-white underline">
                  saadabid643@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-white/80 mt-1" />
              <div>
                <p className="font-semibold text-white">Address</p>
                <p className="text-white/90 text-sm">
                  26-A, First Floor, First Lane, Johri Farm,<br />
                  Noor Nagar Extn., Jamia,<br />
                  New Delhi, Delhi, 110025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;