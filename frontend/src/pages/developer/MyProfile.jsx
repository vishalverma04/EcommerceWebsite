import React from "react";
import { 
  Code, 
  Star,
  Brain,
  Globe,
  Database,
  BookOpen,
} from "lucide-react";
import AnimatedBackground from "./BackgrondAnimation";

const DevelopedByPage = () => {

  const technologies = {
    "Frontend": ["React.js", "Tailwind CSS", "JavaScript", "HTML5","CSS"],
    "Backend": ["Node.js", "Express.js", "MongoDB", "MySQL", "RESTful APIs"],
    "Programming": ["Java", "Python", "C++", "JavaScript", "SQL","Matlab"],
    "Machine Learning": ["Python", "Scikit-Learn","TensorFlow", "Keras", "Pandas", "Numpy", "Matplotlib"],
    "Databases": ["MongoDB", "MySQL", "Redis"],
  };

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Development",
      description: "Building responsive and scalable web applications using modern technologies"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning",
      description: "Implementing ML solutions for real-world problems using cutting-edge algorithms"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Design",
      description: "Creating efficient and scalable database architectures"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "DSA Solutions",
      description: "Expert in solving complex Data Structures & Algorithms problems"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto px-6">
        {/* Header with Animation */}
        <header className="text-center mb-8 py-10 animate-fade-in">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            HG ENTERPRISES INDIA
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Dedicated to delivering excellence through innovation and cutting-edge technology solutions.
          </p>
        </header>

        {/* About the Developer */}
        <section className="mb-20 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
  <h2 className="text-3xl font-semibold text-blue-600 mb-6 flex items-center">
    <BookOpen className="mr-2" /> About the Developer
  </h2>
  <div className="space-y-4 text-lg text-gray-700">
    <p>
      Hi, I'm <strong className="text-blue-600">Vishal Verma</strong>, a dedicated and passionate developer
      with expertise in the <strong>MERN stack</strong>, <strong>machine learning</strong>, and <strong>Data Structures & Algorithms</strong>. 
      I thrive on transforming innovative ideas into impactful digital solutions.
    </p>
    <p>
      My journey in technology is fueled by an unwavering commitment to learning and growing. 
      I specialize in building <strong>scalable web applications</strong>, implementing 
      <strong> machine learning models</strong>, and crafting user experiences that are both intuitive and engaging.
    </p>
    <p>
      With a strong foundation in <strong>Data Structures and Algorithms</strong>, I have successfully tackled 
      complex programming challenges, leveraging advanced algorithmic concepts and optimization techniques. 
      My problem-solving approach is efficient and focused, ensuring robust and reliable solutions.
    </p>
  </div>
</section>


        {/* Services Grid */}
        <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-600 mb-8">Services & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies */}
        <section className="mb-20 bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-semibold text-blue-600 mb-8">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8">
            {Object.entries(technologies).map(([category, techs]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
                <ul className="space-y-2">
                  {techs.map((tech, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-700">
                      <Star size={16} className="text-blue-500" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        {/* <section className="mb-20">
          <h2 className="text-3xl font-semibold text-blue-600 mb-8">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-3">
                <Award className="text-blue-500 flex-shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </section> */}

        {/* Contact Section */}
        <section className="mb-20 bg-white rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-3xl font-semibold text-blue-600 mb-8">Let's Connect</h2>
          <div className="flex justify-center space-x-8 p-4">
            <a
              href="https://github.com/vishalverma04"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{animationDuration: "1s"}}
            >
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX///8+dcI+dsA+dcQ8dsI8d8A/dMQ8dsQ9d8M8d75BdMBBc8Q/db76+/06c8FBdb719/szb8A+d7s2ecLV4PA4ebzv8vipvt07dckwbcDp7/g2cb1CcsY/cs1HcMbj6fI1e7zI1ui2yObR3O7DzuJNgsdylMVCcc4nbr1bi8hOfsKxxeTAz99eh8fd5fOmveB7n9SXtN6GptePrthsldBfhruXsdR2mclNhMBmlMiAp9W1x9zZ5OxWf8uBmtRvkdRsiNKes+JEb9NzmsQ4drCdtdBujMhWhMJbj9JcgNC0wuRDg8qCpMNfirefsdpcj8aY3JlAAAAXjElEQVR4nO2dCXfayJqGLdUilSQKJBBISKwGG3CD2YJjux1Pd9xxJnM7+f//ZqokNrEWMiByZt57Tnf6hkUPtXxLfVV1dfX/OqZSoZJ+jCMrlSlWernr61qjXi+Euqs3atfXuV6lmP/NaTOVXKN+Pxo+tpvIM82WuSSKmt/H/dF9vXFdyST9oLHUaxR+Dm8+dTwuSqm0JADYPyjF2KQtmv500/9ZqPV+q9asNCb97gsulXVNgwgGTIFwKF1n/wj+S1GAjv1SCTTbD5NGJekHF9P1YNwkxPN9v+T7ejoNpQXhDBEHhOy/FKBpul9mr8Se1fn8OLhO+vH3KFUb6q7pQSYJA8yaasoWdE7+/0prvVWSQmAIKfSoS4e1S+2vqWLtKeuaNEQJuybrhFHCUNIOUdNFT7Xi5VEWc5N2y0PyHCUuIX+Z532eXBeTRlpW6s/nJ+IhJIdPT6UPEkLLNsHT85+X0pCp2uTfqiHJxNAkMH/I+IQSwJYFHOPt30HjIhjrX16wx2Z8h1gyPAohlAlxSj42/Zcv9aTxruqvetln8/3t3yVC0OzhP9hLEYJ+6bZUZtJfE2VM1X55vuPrTL6DJT7NyFx72khEgLsFOgC6o7cTMx+Z6+8tW56b77CljkW4kGG0ftWS8FwzvQfX19IALyGehBDZdtbt987O2BtoJph6mCclhCpCSG1lB72z8uXv2o6jY01b9jKnhMfE44SK4wBEsv5//cifD7D2gExENAxQVl0bh0cmlJDqOFkbAV97qJ2JLzV8MX3HqqZ1jOzswhycitCCIGulNWgYneFZZtVclzUZaz5DA1hRZzb+hEKqwvxB7ghIuJs7OV/mL59CqHBTLoW98+SEjG3+J0p/nnhSzX259eGUkEew8+nz2DZim3D5yymbMVNvUx2oqrIgBHPAGeGJmxV7788na8biX5KGmFeMVKZZXmIT4QkRISFpa3Si2DHXd319BpgYIUprhneanlpre7rvAxQCJkUoSbqeJma3cXzA5yZkk6cO5IXNO89EuioAmNmgnbsj82UmHlz3WxIhDAW9yVHnm+LQ1LSLItQ0c3jE+abSvy1j5ZIIIdTLt/2j5cgrN2b51kfwdN714YSqf1s2b44UUeXGhoZ9jciXREg0X9e88VGsxvUrhhrMEis9mz0vgDBtERVqEv12hHWO3OutDlmvuACsZaV5tCHp5W8fbsVeu/y3L5TlTELOrd/+4Fjstc3bGeHZ4gdx+X+XvI8hVm482SnhNcJkvJl1AR8T7/EDRiN/Y0KLGIZ8oYSyQSwbeTexU1SZkcs+BCHjUtsQIkIsglqjmA5caoLCRXh4sYRMBmF2YxAvQ1WwocJi6uVEBScECyVNGIgNIYkU4gA+V7M8CLx4Qm7G5E6MePG6C7NqJFd/oYQS9+G8zsHOTeW1rP42hGpWun090GakhiU/Qrj4uIskVPzbA/PhBaooWXtjNAHCPGKQSTyf6ErhWESoaiuAHjTb5OxsNmvbxqZoQpHYp3Xe399pWDwzFTymCQGR6iKvZXrs+zp02+ejajWbldUDnPDML4hQFqENXw0UNWs37/L5fLGSu3vqmB7VNM2QUVb1ff04iLyHEJsExSvUa70/3eWKRfaN9y/65m+APMUJzba44X+i7LNVVd0AyBBJ9XHmJqVSlQKDTKcNNmjLJR8fhZCvuyKLFz54ZqdQmVfcFl/ZX+x4nzcSBaxnYUi4Fk1wQkiqk8jLc6N3QmfVCschxBBohmF9HkU73sgAu74BVZ/FAFnEtItQS3dWVyrzhfGLz0syjtNLea/HfuexsOpRN9I7g1TZGwtFUpmRr0urhEsmAmvd9Xk5X++nTawdBVBKp5kFH9bXI4bMCyE7QlSoaUJJ1EYHSzsIse73N/4wjb6yfT4/SCwoempsjIj6xNpFaKTfBby34qsJyVovXSL0S1sS6sX62AsZZzmPlaeBoVmjixdNX8a/RVm8zHt83hLx3RloByGLpbzx3jRx6t5llmLHmifQ3a3+UfGuY/KoLVi8kY20EX4KxaZpukyt4HeDlP/ZNFuexwu8ECIG4muuigplnsvuFLY+ZcUzdrUhm33N+32uTQVBedkLXSf09R1vL/ZdKiM7yzhYbGrIXqvVIp8eJoXnWq+Sz8yUr/Rqz4XJ108W+3uPhXgEYsdRWbBN3f6uViC7pxr2a6r7/NOxJ+8jHO/8gFrXkO0qxNR6qzYfB/Xc7rGf6tUH407nLa37IEsM8r67ouRxrz2iux/vqubK+wjdye6PyEw6pNrsfpn8Ie7tV/6YfPmvFzaD7psLR+4+Qsnd+RulunBv0YG516w2RpP64etCxfr9aO9MeLefkG4wZgv9oPvLKlpJbhioucquZwsRf2x/f767n1BuJbnvo+Lud5twd3t28V4HEQu48QPcMxbQrSm/v5dKGN9ve3vv1ZT2E7aSrC5PCRBK/rdt3eweL+VEf2NCGWxpxMrYEyCk3uUTeuPNjfj8ZinS/nza5behYr1ttGjFr2+2JEDoJkmYESCEqv32sMkeN0jVEsiJyq0kNyQVRQiRVbU3+A6ZvkfmoQkA3LAqG4di6/RFrNuVa+0nZFGUJQ/X3b8eBctJw+3r2q0TlJQJ67klsNiOWFN56/mMkRlt6m2EsvdPAmQzTUQI+VCja3m3zEq6dTuhcZME2lQ3IokSTgjhajetrwzhraUXsmUlwhZqdwS8RCi3Vg3Gp5XQcishtLzkXO+KiDkMCb1fK2/1VkG2EhJvq2N7ct0LhBaztcCVuWaySrhVMLsvT3BCjYVyztMMRTQX8Uu44gki+JJUN610NJGipSlhpJvWOsLJXJnQl6QixHzX2JURXiGMLD5MNiykbX27lZzbln/bldVfIYRL3TRzI/LThKLoXDvINqkmZC5CTuNmYRJr77tSyVFAmtxMylWAfDyJrTZ3F21xD8SGoQqBucGlPacyQxNAKESIF6E+e1ewLravhhQipXyG7XG7leuWgbp9oXQa8PF/6e68NXrfdCFCCUn+jlzkmfTDl5AYof5tZvQbHRxY0r1taJGnJFOJofIPxNK29tIFIXaceS3YvRlWr+0hhND6nOQ8OlPtM9lHGCx0OsCcDsRi31cE7KFsGHCYLNtUQ6ptXU+freMyqcCZrtT1uvrOxeMZoSwdXh53El2/bJ9KF4QSUfG0Bvw6nbaELD7duICfgPqOwDiUCCFW2CTPXtowBAAlegmjkKvmba/6mGbP+MZIw/CCg1H4xrvt/XpJ+D1psrneRR5YhpIXVIDnvyK4s0xlJjdZf21ZhZ2xfuh4o2xWgV+5dat8RqoqMJcC93IO/9u9yDYlVBUFfuahbM8j0C/vr0jD35PmWtJ4lyM9XeUtMyMYpK/rHlGdkr6X8II6KXdS9hLikqMgk001qYGH+AEpewnN8x4Qs1u9/YSS4yiQDlJXqb4nqwLlvfQ9eZd0ofz7/niPQ9E+I+wGIeX+Jny6nImGmbinXY241C5dRrijQnxZbuEiToebKlUQJIQpoeqGgPBSHJpQDdHHzl/lxF5KYdLBfVQ50a6XW1uS2UbYvKSplE2mTUHC+m7LskTYvqwjcCttMUIWBA8ECfcX355VxZ1ezRLhgAXMYoQ7C1vPr2JfsGWGV31BwuElGXxm8oVbZrcPu5D5uxKOr7q/K6GoU3MlOOv+toTNK8GVw8sjFOylnSvBRaffdaaR0NX6FrzNhL+ptZDUK8EVR/PiCAXbEF6Jve7ifJqKoJWTJNE2/F39UtZLRcfhbxpbMELBKgyKLoxQFZ5LRX8L88IiYMGplFn8rtgrJTfJwtl1iWYxpO6V6Ig1j30U44eUEtjiFYi2RWMLyZxcVK5tItpLx6LxoUQfLipf+iBK2L8aiRL+djnv8LGHonkaSUqwNHhdFZFdCVzm/dWdKKF5SZNpQ/ip765qotOuOUgaa0kjUUK3dtUTJaSXtEL6XdTvdntCe6UCKYlu6YpK+KElN3OVQsI/x+WszQh7NBSlrlKiJh+YT0mDzSVqDZnBZ4SiCQ9Jsi6lm6Ys0XNiTH4C2L0pabJIHKzRS7EXDV0XQEQESkF1Ys0FaUQEwkQNf0kabap+WaA6BhLLgC0+d1QMSROqTTTof1+GW1PpihAi25ahxZ+4+IlKIoQSov5llNQU0v7+8h++yQ5Jn3j+LP9AZZFCOKgiI/5pr0dU/oZioUPFIKIP/IFTP02CBU5aY4TW0W8kiKO6JVRLCXTJaoUnDjVcA/v7C2pg1rbpl+QbMf/gyWmBeljgADLds3z9IoWV7HsIESGSLHjm2wn1TMTO3QZAQSisEe69Ytbq+08lRwjC5JcvimMKkdDB4sjAr2EKNDMs6SJ3L8LgNLKES6NSBVEXDBKpNNs086MMBO/P5OtxyWaGe8I7JWEWznf4HLB1TZK8h0QJb4S387JpY74BpvJVxGmb/TSJnjjwj3fAdl7769wHm3hI/OYDvZTcvpJrgVrmOWEWLTaR1puqMCFQwUtSQ7H3gqX9Z31NpajNxTW0vfYB+4CrVWfLET4nB3x1mDct/KR4+V6IB/H3yZYNnOPd0nOAKn3fQZb4cIpsYiqQAw5XVQCWEjD8xb6mC0W+M0C0fPx1pUlFj6oO7gXEztmX9Yvj4GZlAfdyRtiJdLRHKngat6KqKmd0zjzd9P7HcfhBxYrwoeErh1vUveDWsbWXGXK4Eyy4YyGQatsqP/Eam2e8TDrVIHaVYB1ks4LjEEIvGiSk3gxNx+rq+xECJZ+ppBsziwmzWfY7ElvC9uRcPbX4l4nsqqUBRYQweEKZvK00wH8sTQeseSI/AyIWvr0tlUp/l9A8ZgkGIuTN6o0b51hTzDRYOCGzeIJfO6Xud56RzQnt/6x8zJ8t9tyrbYiILTuOogJfseaES6eceZ0z3CWdG3W88FwksfBAQayhgbJ2JFnqe3DD9sqvQWyL2EzsD0ReJ5Sh3B6ctqsWJ21Pg4cQMmvGA/zva7PEncv3By+/UpYRQp7Xct2Wx/9IyBqhTJD17z+n66r5f/59I9OMhTBh8ITuekap2GGmJnKqOyeEN4Va7rrwn3dKGeI6IZsA3qyXv07TjpVh+u3trUoOI2RDVnVoZ/2RUgXXIdWIfwqVRalXb9TmIzH6YTJrVyQDvew+1PLHtR2p/POja6YNy7IObUPyZjvmplRE7oURkshrI0azeN9dDc4YIb/3kTWr0XoZ1CrH6q75SmPotDwtbcgQhfvMwRLiPsKqDV42VXBlhqa8suEZRlMWuSEbjbN0wNKR2Gwal5Fm0vfR83Xvo5T5XK0w7LguZiQcJ7DD65PgDjEK86+Nj1HryCuBMNRuIr5dpvBuEIYY/C8qg8vzmuPhj0auGK/H5iu15/th2/bM4KKOWZOFd5yLE0Ikrd1PMX3+IV3pABrQo7cnpxqfCJI3KABkfYr6rv/SvRkO7uvXFeHscaqSa9wNRg83nyyP8ltd8BKhdCihBOm2Y4LqL9EcAUS4fLtye3KtDSMHYs9OnQouZpMA5leV+A5zE16azbpoU6buXl4Ux3VNHOJhTBeECphdTSTqc+sv9W1ftFIdDhG4Levp6PbYWgduI2TvYIjOVO4BN9rlhy5/C1DYwGCjGnyM0P2y9af9o8nmDOZ4zl5qWRBomqdHUk8NBLcQQu7z6jqyLT4mDzpQKt+nigK5d02hbdNlQmlBKIZIt4zCQE+WJSsLBz5NkKpJLLSO9LeBJ2vzKTtCKDNCjJFNINYOvDwz18VA4YQY2lkJL1/yId6GhoyhrO3M6ObeqjILUey54Q9ANA3dLSOOmae4cv/xzGwwctlAilMqH7oOd1/2mY/PnEoFTu9cFGqwZckEOtDStJ3VzCMP8iAMRXJ2BoGRWSOXZT0RbSKctqniON8ONRiZtgP4TSXTlopDCCXsAOLtLoopKvw6NUVZ7hAyc81oc7lv37vM+1klnL6YS4OtPw4E5EcEsznmQ4SYz+Eou8dJvnfXRjQfBiCy36I4plWEg8Gxeg958F9aunow4NWVbWhLcVmcXsrmA2Xv8R35tslGa5QQ+76CvKelftdQ2WQyvT9vA2Ha23OPyUaNPG3RL2L1UmIhuuPqh6mugWNHQwyZSI5iGe5yZueHrk8J5Q2EkhsnnCq60oJQaJl3lVBLQ7B/USUzYISREIOFuVghBqZLv07mpw4wv0hP3kToPcZxTFNt+jFCCQNnIGCFe+3VY1BlGfBp0lw+rS0/8rCkZqfJjejzyCTWAlxqYoJpngGiWISK813ICtc7mw8JJRFDkx+5gPkwS374/IUw5lU0NTdCePBAhFAVs8KZp43nYsmWFalrY91Zlxb3ey0RAiVeBq6nLgiZDifMinqKlfbGD4cweuZeqtE1lyOoOZ/ZjZe3KX6n03EYj5B2hZfEGsamcgCgGCvnJhYnxIMwQkip67YbMSPgeWwTi5BqBxT7bCqFZz6/3V4dYMVBJ/S5+ZVnwbV4zfhJ4szoQ4Sm8CWdXG1vrUwKVasEbnAYapNxt9nsdJrN7vjp+SNLp6lBXMLQ6zroy3odysL1yKfw5W3/ZuMIy/eua7Xr3kdr3lL3QYG6HKSiDyFkYbevH1ro80wwjh7xDi3i+OmTFkKH+3diEDq+L2/LXGxTamKsJPl5Xkp3+6csTqzHJAQO1g7fPJh/8qJnnAE9uBH30J/qENVj9lIAYh1qUbmJ1IJxY8wInZcTrjXFJYTeTawZLvc5UkPGXDSsY0ROeBBt3F7qvcfchl1jE+qio0I7C3SNVGPFfmI6nJAnaXcn1/Z8Iyg5UMPzT+MeFSLeyYbi/GQ1UXsI04RIGH3gge4dR5UWRTqckEWL6vOJqjDqh1p8fmEt3HZTnpBSA35Lb+RDWYgBmms3Zh9HBxPK/J7dwYd+78wARM82hYggAKujkxS21d15bCEaH0IoEtXvEosCS8uGn/+6WDPS304xGOvuoTE+Nj8KGCycLodSkH05dwNvyyfYenE4oXfA8s92DTQNGoYBF4TYKZXKZqufO/KMcxihjKh0pN3XPzVeMBDaKAjVcDWI10SZvwq9YiaKmcrkY6/nC++cZz+BpiE2yXwcLtRPVbaJZkwJVX4PuhKusXv2r9FdLderBPrzzz9rhdHj57gbaw4gzBppYh9xK92PZlbCaRIQQrggRIahma6Zfv/0OGZqf3qzDC+2S5ASJ1SJZX0+6jazxi8PTtswqNwDICSUw/tO/Om6L98bRc5ByOaY9pFD1etfHtpAyFcX2OQwW9lmTZtOxz7K5gBC4H47+p6IytiUp700HAkBIbJt5q0im0gaE3OaeZ1C6y7eHCtOSM1TbBdIjfiWsfma0JxQxRKpWulAxNDL5dMTUjo6jWdc6NAgxx18y3T1XkWs08KgeIFFMgYvxtDdDxPuWFpjX0M7J9uPXBvz63TgMiGfVgGfWoP0Pv87TdtYNiegxTHkOwgNA41PeHxFZdShzMOZpblnliMwHtK0JOM4hNsq9BCxT+P1z5R5bpoaZ4RRwqB8Iuy/jPA+JuH9fkKv/Xzi2vJUr29GCecPA2er425sQncPITX7vdPvgUjdueZuwvhtuIfQdO/Oc+BY5cbjtbQ8RD0y4bZeyv8ox80ZxlK9a2BH03QdT59kKdjBOH4vjcyl4d1bvARZS8sKNdqnTEavqTJoOnyPOzgHIfMENbM5OfeOwNpQMg2Zh4tTwmmnAscmVCCxPHmYwBFOmUYfUR/wnFhoCGe38mE3ZvZrIyHzkTzSP8v2o3UVG99udTR1ZoJ8Ma+xOTahXx4/J3g/b73bkpcI8ZQw3i++QhguBrnNerKnjaT+ePcI76c8gcvthfKhcRjUyQVOPK+oljy3E7Pq4aiqfe041LYsZKQt20aMMG703TB1R+W7yYKsl+N3vl7KEXG5YZc9lqQR286qKu3GrcbodU1FydoW0oBMSHd4GVdmhurdPb2XfWgRRSFWzPCQO4RWliESpVx+f7q7rMOnmfGo3X8Brum67Xr8mT1z13bZZ+DXn7VLOvF2ruJ1vVBofMj5T/Ua93y7zdGe6ehKfXzmO8JH/B/T/wJHGgeNAU0cRgAAAABJRU5ErkJggg==" className="w-10 h-10 text-gray-700 hover:text-blue-600"></img>
            </a>

            <a
              href="https://www.linkedin.com/in/vishal-verma-125905290/"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{animationDuration: "1s", animationDelay: "0.2s"}}
            >
              <img src="data:image/png;base64,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" alt="linkedin" className="w-10 h-10 text-gray-700 hover:text-blue-600"></img>
            </a>

            <a
              href="https://leetcode.com/vishalverma04"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{animationDuration: "1s", animationDelay: "0.4s"}}
            >
              <img src="data:image/png;base64,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" alt="LeetCode" className="w-10 h-10 text-gray-700 hover:text-blue-600" />
            </a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=vishalverma04126@gmail.com"
              target="_blank"
              className="transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{animationDuration: "1s", animationDelay: "0.6s"}}
            >
              <img src="data:image/png;base64,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" className="w-10 h-10 text-gray-700 hover:text-blue-600"></img>
            </a>

            <a
              href="https://wa.me/8218420274"
              target="_blank"
              className="transform hover:scale-110 transition-transform duration-300 animate-bounce"
              style={{animationDuration: "1s", animationDelay: "0.8s"}}

            >
            <img src="data:image/png;base64,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" className="w-10 h-10 text-gray-700 hover:text-blue-600"></img>
            </a>

           
          </div>
          <p className="text-gray-600">
            Designed and developed with{" "}
            <span className="text-red-500">❤️</span> by Vishal Verma
          </p>
        </section>

        {/* Footer */}
        <footer className="text-center  border-t border-gray-200">

        </footer>
      </div>
    </div>
  );
};

export default DevelopedByPage;