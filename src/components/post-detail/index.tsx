import * as React from "react";
import { useState } from "react";
import * as headImg from "../../assets/images/headline.png";
function PostDetail(props: any) {
  console.log(props.match.params);
  // 这是路由参数，用id去后台请求数据,此处模拟数据
  const [postDetail] = useState({
    id: 1,
    author: "大漠穷秋",
    postTime: "2016-12-12 12:12:12",
    readTimes: 999999,
    commentTimes: 99999,
    title: "从头了解光刻机",
    text:
      "光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>光刻是集成电路最重要的加工工艺，他的作用，如同金工车间中车床的作用。在整个芯片制造工艺中，几乎每个工艺的实施，都离不开光刻的技术。光刻也是制造芯片的最关键技术，他占芯片制造成本的35%以上。在如今的科技与社会发展中，光刻技术的增长，直接关系到大型计算机的运作等高科技领域。<br/><br/><p>测试渲染HTML标签。</p>"
  });
  return (
    <div className="post-detail-container">
      <div className="img-container">
        <img src={headImg} alt="光刻机" />
      </div>
      <div className="row">
        <div className="col-md-12">
           <h3 className="mtb-16px">{postDetail.title}</h3> 
        </div>
      </div>
      <div className="row post-info ">
        <div className="col-md-3 col-xl-3">
          <span className="fa fa-user"></span>
          <span className="ml-5px">{postDetail.author}</span>
        </div>
        <div className=" col-md-8 col-xl-3">
          <span className="fa fa-clock-o"></span>
          <span className="ml-5px">{postDetail.postTime}</span>
        </div>
        <div className="col-md-3 col-xl-3">
          <span className="fa fa-hand-pointer-o"></span>
          <span className="ml-5px">{postDetail.readTimes}</span>
        </div>
        <div className="col-md-8 col-xl-3">
          <span className="fa fa-comment"></span>
          <span className="ml-5px">{postDetail.commentTimes}</span>
        </div>
      </div>
      <div className="row mt-16px">
        <div className="col-md-12 post-content">{postDetail.text}</div>
      </div>
    </div>
  );
}
export default PostDetail;
