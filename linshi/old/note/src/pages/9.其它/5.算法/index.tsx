import { AlertPro, AnchorCard, TabsPro } from '@/components'

export default () => (
  <TabsPro
    items={[
      {
        label: '排序算法',
        children: [
          <AnchorCard title='冒泡排序 (for>for)'>
            <AlertPro>
              <div>遍历一个数组，将相邻的两个值进行比较，如果前面的比后面的大，则两个值交换位置，</div>
              <div>第一次遍历完，数组中最大的值就一定放在最后位置了，</div>
              <br />
              <div>第二次遍历，可以少遍历一次，最后的值肯定最大不用再比较，</div>
              <div>第二次遍历完，剩余数组中最大的值就放在倒数第二的位置了，</div>
              <div>......</div>
              <div>以此类推，排序完成。</div>
              <br />
              <div>优化：每轮遍历前flag置为0，如果有过位置交换则置为1，</div>
              <div>如果一轮下来flag仍是0，说明没有过交换，证明排序完成，可以结束循环。</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='选择排序 (for>for)'>
            <AlertPro>
              <div>遍历一次数组并选择其中最大的值，将其与数组最后一项进行交换，</div>
              <div>第一次遍历完，数组中最大的值就一定放在最后位置了，</div>
              <br />
              <div>第二次遍历，可以少遍历一次，最后的值肯定最大不用再比较，</div>
              <div>第二次遍历并选择其中最大的值，然后与倒数第二项进行交换，</div>
              <div>......</div>
              <div>以此类推，排序完成。</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='快速排序 (递归)'>
            <AlertPro>
              <div>函数参数：数组</div>
              <div>函数功能：</div>
              <div>(1) 如果数组参数的成员数为1则直接返回</div>
              <div>(2) 取出数组第一个，和其它数组成员比较，小于的放在数组A，大于等于的放在数组B</div>
              <div>(3) 将数组A和数组B分别调用本函数排序后，以`数组A+数组[0]+数组B`形式连接并返回</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='归并排序 (递归)'>
            <AlertPro>
              <div>函数参数：数组</div>
              <div>函数功能：</div>
              <div>(1) 如果数组参数的成员数为1则直接返回</div>
              <div>(2) 将数组从中分为数组A和数组B，并调用本函数排序</div>
              <div>(3) 将排好序的两个数组首位循环比较，将小的值插入一个临时数组</div>
              <div>(4) 最后将`临时数组+数组A+数组B`连接并返回</div>
            </AlertPro>
          </AnchorCard>,
          <AnchorCard title='冒排和选排的异同'>
            <AlertPro>
              <div>它们的原理都是循环(数组成员-1)轮，循环的目的是将剩余最大值放到数组的剩余最后位置上</div>
              <div>不过实现方式略有不同，</div>
              <div>冒泡是两两排序，大的放后边，这样一轮下来，最大值就放在了最后位置上，</div>
              <div>排序是先遍历一遍选出最大值，再与最后位置的值交换。</div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
      {
        label: '查找算法',
        children: [
          <AnchorCard title='二分查找 (递归)'>
            <AlertPro>
              <div>函数参数：数组，值</div>
              <div>函数功能：</div>
              <div>(1) 如果数组参数的成员数为1则判断是否为s，是则返回true，反之返回false、</div>
              <div>(2) 将数组从中分为数组A和数组B，</div>
              <div>(3)
                判断数组A的最大值是否大于s，大于则把数组A作为参数调用本函数，反之把数组B作为参数调用本函数，并把函数的返回值返回
              </div>
            </AlertPro>
          </AnchorCard>,
        ],
      },
    ]}
  />
)
